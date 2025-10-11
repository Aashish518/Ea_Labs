import AlertBox from "../components/ui/common/AlertBox";
import ConfirmBox from "../components/ui/common/ConfirmBox";

export const showSuccess = (msg) => {
    AlertBox({ type: "success", message: msg });
};

export const showError = (msg) => {
    AlertBox({ type: "error", message: msg });
};

export const confirmAction = async (options) => {
    return await ConfirmBox(options);
};
