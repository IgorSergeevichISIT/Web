'use strict';

var anatomy$1 = require('@zag-js/anatomy');
var domQuery = require('@zag-js/dom-query');
var core = require('@zag-js/core');
var utils = require('@zag-js/utils');
var types = require('@zag-js/types');

// src/timer.anatomy.ts
var anatomy = anatomy$1.createAnatomy("timer").parts(
  "root",
  "area",
  "control",
  "item",
  "itemValue",
  "itemLabel",
  "actionTrigger",
  "separator"
);
var parts = anatomy.build();
var dom = domQuery.createScope({
  getRootId: (ctx) => ctx.ids?.root ?? `timer:${ctx.id}:root`,
  getAreaId: (ctx) => ctx.ids?.area ?? `timer:${ctx.id}:area`,
  getAreaEl: (ctx) => dom.getById(ctx, dom.getAreaId(ctx))
});

// src/timer.connect.ts
var validActions = /* @__PURE__ */ new Set(["start", "pause", "resume", "reset"]);
function connect(state, send, normalize) {
  const running = state.matches("running");
  const paused = state.matches("paused");
  const time = state.context.time;
  const formattedTime = state.context.formattedTime;
  const progressPercent = state.context.progressPercent;
  return {
    running,
    paused,
    time,
    formattedTime,
    progressPercent,
    start() {
      send("START");
    },
    pause() {
      send("PAUSE");
    },
    resume() {
      send("RESUME");
    },
    reset() {
      send("RESET");
    },
    restart() {
      send("RESTART");
    },
    getRootProps() {
      return normalize.element({
        id: dom.getRootId(state.context),
        ...parts.root.attrs
      });
    },
    getAreaProps() {
      return normalize.element({
        role: "timer",
        id: dom.getAreaId(state.context),
        "aria-label": `${time.days} days ${formattedTime.hours}:${formattedTime.minutes}:${formattedTime.seconds}`,
        "aria-atomic": true,
        ...parts.area.attrs
      });
    },
    getControlProps() {
      return normalize.element({
        ...parts.control.attrs
      });
    },
    getItemProps(props2) {
      const value = time[props2.type];
      return normalize.element({
        ...parts.item.attrs,
        "data-type": props2.type,
        style: {
          "--value": value
        }
      });
    },
    getItemLabelProps(props2) {
      return normalize.element({
        ...parts.itemLabel.attrs,
        "data-type": props2.type
      });
    },
    getItemValueProps(props2) {
      return normalize.element({
        ...parts.itemValue.attrs,
        "data-type": props2.type
      });
    },
    getSeparatorProps() {
      return normalize.element({
        "aria-hidden": true,
        ...parts.separator.attrs
      });
    },
    getActionTriggerProps(props2) {
      if (!validActions.has(props2.action)) {
        throw new Error(
          `[zag-js] Invalid action: ${props2.action}. Must be one of: ${Array.from(validActions).join(", ")}`
        );
      }
      return normalize.button({
        ...parts.actionTrigger.attrs,
        hidden: (() => {
          switch (props2.action) {
            case "start":
              return running || paused;
            case "pause":
              return !running;
            case "reset":
              return !running && !paused;
            case "resume":
              return !paused;
            default:
              return;
          }
        })(),
        type: "button",
        onClick(event) {
          if (event.defaultPrevented) return;
          send(props2.action.toUpperCase());
        }
      });
    }
  };
}
function machine(userContext) {
  const ctx = utils.compact(userContext);
  return core.createMachine(
    {
      id: "timer",
      initial: ctx.autoStart ? "running" : "idle",
      context: {
        interval: 250,
        ...ctx,
        currentMs: ctx.startMs ?? 0
      },
      on: {
        RESTART: {
          target: "running",
          actions: "resetTime"
        }
      },
      computed: {
        time: (ctx2) => msToTime(ctx2.currentMs),
        formattedTime: (ctx2) => formatTime(ctx2.time),
        progressPercent: (ctx2) => {
          const targetMs = ctx2.targetMs;
          if (targetMs == null) return 0;
          return toPercent(ctx2.currentMs, ctx2.startMs ?? 0, targetMs);
        }
      },
      states: {
        idle: {
          on: {
            START: "running",
            RESET: { actions: "resetTime" }
          }
        },
        running: {
          every: {
            TICK_INTERVAL: ["sendTickEvent"]
          },
          on: {
            PAUSE: "paused",
            TICK: [
              {
                target: "idle",
                guard: "hasReachedTarget",
                actions: ["invokeOnComplete"]
              },
              {
                actions: ["updateTime", "invokeOnTick"]
              }
            ],
            RESET: { actions: "resetTime" }
          }
        },
        paused: {
          on: {
            RESUME: "running",
            RESET: {
              target: "idle",
              actions: "resetTime"
            }
          }
        }
      }
    },
    {
      delays: {
        TICK_INTERVAL: (ctx2) => ctx2.interval
      },
      actions: {
        updateTime(ctx2) {
          const sign = ctx2.countdown ? -1 : 1;
          ctx2.currentMs = ctx2.currentMs + sign * ctx2.interval;
        },
        sendTickEvent(_ctx, _evt, { send }) {
          send({ type: "TICK" });
        },
        resetTime(ctx2) {
          ctx2.currentMs = ctx2.startMs ?? 0;
        },
        invokeOnTick(ctx2) {
          ctx2.onTick?.({
            value: ctx2.currentMs,
            time: ctx2.time,
            formattedTime: ctx2.formattedTime
          });
        },
        invokeOnComplete(ctx2) {
          ctx2.onComplete?.();
        }
      },
      guards: {
        hasReachedTarget: (ctx2) => {
          let targetMs = ctx2.targetMs;
          if (targetMs == null && ctx2.countdown) targetMs = 0;
          if (targetMs == null) return false;
          return ctx2.currentMs === targetMs;
        }
      }
    }
  );
}
function msToTime(ms) {
  const milliseconds = ms % 1e3;
  const seconds = Math.floor(ms / 1e3) % 60;
  const minutes = Math.floor(ms / (1e3 * 60)) % 60;
  const hours = Math.floor(ms / (1e3 * 60 * 60)) % 24;
  const days = Math.floor(ms / (1e3 * 60 * 60 * 24));
  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  };
}
function toPercent(value, minValue, maxValue) {
  return (value - minValue) / (maxValue - minValue);
}
function padStart(num, size = 2) {
  return num.toString().padStart(size, "0");
}
function formatTime(time) {
  const { days, hours, minutes, seconds } = time;
  return {
    days: padStart(days),
    hours: padStart(hours),
    minutes: padStart(minutes),
    seconds: padStart(seconds),
    milliseconds: time.milliseconds.toString()
  };
}
var segments = /* @__PURE__ */ new Set(["days", "hours", "minutes", "seconds"]);
function isTimeSegment(date) {
  return utils.isObject(date) && Object.keys(date).some((key) => segments.has(key));
}
function parse(date) {
  if (typeof date === "string") {
    return new Date(date).getTime();
  }
  if (isTimeSegment(date)) {
    const { days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = date;
    const value = (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds) * 1e3;
    return value + milliseconds;
  }
  throw new Error("Invalid date");
}
var props = types.createProps()([
  "autoStart",
  "countdown",
  "getRootNode",
  "id",
  "ids",
  "interval",
  "onComplete",
  "onTick",
  "startMs",
  "targetMs"
]);
var splitProps = utils.createSplitProps(props);

exports.anatomy = anatomy;
exports.connect = connect;
exports.machine = machine;
exports.parse = parse;
exports.props = props;
exports.splitProps = splitProps;
