export interface AjaxResponse<T = any> {
    response?: T;
}

type SuccessCallback<T> = (data: AjaxResponse<T>) => void;
type ErrorCallback = (error: any) => void;

class Ajax {
    post<T = any>(url: string, success: SuccessCallback<T>, error?: ErrorCallback): void {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) return;

            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    success(data);
                } catch (e) {
                    error?.(e);
                }
            } else {
                error?.(xhr.statusText);
            }
        };
    }
}

export const ajax = new Ajax();
