/* tslint:disable */
/* eslint-disable */
/**
 * WebApi
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError, operationServerMap } from './base';

/**
 * 
 * @export
 * @interface UserDTO
 */
export interface UserDTO {
    /**
     * 
     * @type {string}
     * @memberof UserDTO
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof UserDTO
     */
    'password': string;
}
/**
 * 
 * @export
 * @interface WeatherForecast
 */
export interface WeatherForecast {
    /**
     * 
     * @type {string}
     * @memberof WeatherForecast
     */
    'date'?: string;
    /**
     * 
     * @type {number}
     * @memberof WeatherForecast
     */
    'temperatureC'?: number;
    /**
     * 
     * @type {number}
     * @memberof WeatherForecast
     */
    'temperatureF'?: number;
    /**
     * 
     * @type {string}
     * @memberof WeatherForecast
     */
    'summary'?: string | null;
}

/**
 * TestControllersApi - axios parameter creator
 * @export
 */
export const TestControllersApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} id 
         * @param {number} [page] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCar: async (id: number, page?: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getCar', 'id', id)
            const localVarPath = `/TestControllers/cars/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        lol: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/TestControllers/lol`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        testControllersGet: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/TestControllers`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TestControllersApi - functional programming interface
 * @export
 */
export const TestControllersApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TestControllersApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {number} id 
         * @param {number} [page] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCar(id: number, page?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCar(id, page, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['TestControllersApi.getCar']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async lol(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.lol(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['TestControllersApi.lol']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async testControllersGet(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.testControllersGet(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['TestControllersApi.testControllersGet']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * TestControllersApi - factory interface
 * @export
 */
export const TestControllersApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TestControllersApiFp(configuration)
    return {
        /**
         * 
         * @param {number} id 
         * @param {number} [page] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCar(id: number, page?: number, options?: RawAxiosRequestConfig): AxiosPromise<string> {
            return localVarFp.getCar(id, page, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        lol(options?: RawAxiosRequestConfig): AxiosPromise<string> {
            return localVarFp.lol(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        testControllersGet(options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.testControllersGet(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TestControllersApi - object-oriented interface
 * @export
 * @class TestControllersApi
 * @extends {BaseAPI}
 */
export class TestControllersApi extends BaseAPI {
    /**
     * 
     * @param {number} id 
     * @param {number} [page] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TestControllersApi
     */
    public getCar(id: number, page?: number, options?: RawAxiosRequestConfig) {
        return TestControllersApiFp(this.configuration).getCar(id, page, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TestControllersApi
     */
    public lol(options?: RawAxiosRequestConfig) {
        return TestControllersApiFp(this.configuration).lol(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TestControllersApi
     */
    public testControllersGet(options?: RawAxiosRequestConfig) {
        return TestControllersApiFp(this.configuration).testControllersGet(options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * UserApi - axios parameter creator
 * @export
 */
export const UserApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {UserDTO} [userDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userLoginPost: async (userDTO?: UserDTO, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/user/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(userDTO, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {UserDTO} [userDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userRegistrationPost: async (userDTO?: UserDTO, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/user/registration`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(userDTO, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UserApi - functional programming interface
 * @export
 */
export const UserApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UserApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {UserDTO} [userDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userLoginPost(userDTO?: UserDTO, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userLoginPost(userDTO, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserApi.userLoginPost']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {UserDTO} [userDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userRegistrationPost(userDTO?: UserDTO, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userRegistrationPost(userDTO, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserApi.userRegistrationPost']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * UserApi - factory interface
 * @export
 */
export const UserApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UserApiFp(configuration)
    return {
        /**
         * 
         * @param {UserDTO} [userDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userLoginPost(userDTO?: UserDTO, options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.userLoginPost(userDTO, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {UserDTO} [userDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userRegistrationPost(userDTO?: UserDTO, options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.userRegistrationPost(userDTO, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UserApi - object-oriented interface
 * @export
 * @class UserApi
 * @extends {BaseAPI}
 */
export class UserApi extends BaseAPI {
    /**
     * 
     * @param {UserDTO} [userDTO] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public userLoginPost(userDTO?: UserDTO, options?: RawAxiosRequestConfig) {
        return UserApiFp(this.configuration).userLoginPost(userDTO, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {UserDTO} [userDTO] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public userRegistrationPost(userDTO?: UserDTO, options?: RawAxiosRequestConfig) {
        return UserApiFp(this.configuration).userRegistrationPost(userDTO, options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * WeatherForecastApi - axios parameter creator
 * @export
 */
export const WeatherForecastApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getWeatherForecast: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/WeatherForecast`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * WeatherForecastApi - functional programming interface
 * @export
 */
export const WeatherForecastApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = WeatherForecastApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getWeatherForecast(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<WeatherForecast>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getWeatherForecast(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['WeatherForecastApi.getWeatherForecast']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * WeatherForecastApi - factory interface
 * @export
 */
export const WeatherForecastApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = WeatherForecastApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getWeatherForecast(options?: RawAxiosRequestConfig): AxiosPromise<Array<WeatherForecast>> {
            return localVarFp.getWeatherForecast(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * WeatherForecastApi - object-oriented interface
 * @export
 * @class WeatherForecastApi
 * @extends {BaseAPI}
 */
export class WeatherForecastApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WeatherForecastApi
     */
    public getWeatherForecast(options?: RawAxiosRequestConfig) {
        return WeatherForecastApiFp(this.configuration).getWeatherForecast(options).then((request) => request(this.axios, this.basePath));
    }
}