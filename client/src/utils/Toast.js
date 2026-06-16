import { toast } from "react-toastify";

const successToast = (message, options = {}) =>
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    ...options,
  });

const errorToast = (message, options = {}) =>
  toast.error(message, {
    ...options,
  });

export { successToast, errorToast };
