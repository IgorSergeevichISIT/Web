// export interface AjaxResponse<T = any> {
//     response?: T;
// }
//
// type SuccessCallback<T> = (data: AjaxResponse<T>) => void;
// type ErrorCallback = (error: any) => void;
//
// class Ajax {
//     async post<T = any>(
//         url: string,
//         success: SuccessCallback<T>,
//         error?: ErrorCallback
//     ): Promise<void> {
//         try {
//             const response = await fetch(url, {
//                 method: "POST"
//             });
//
//             if (!response.ok) {
//                 throw new Error(`Ошибка: ${response.status}`);
//             }
//
//             const data = await response.json();
//             success(data);
//
//         } catch (err) {
//             console.error("Ошибка при запросе:", err);
//             error?.(err);
//         }
//     }
// }
//
// export const ajax = new Ajax();
