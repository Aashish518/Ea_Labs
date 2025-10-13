// src/components/ui/common/AlertBox.js
import Swal from "sweetalert2";

const AlertBox = ({ type = "success", message = "Action completed successfully!" }) => {
    const isSuccess = type === "success";

    Swal.fire({
        toast: true,
        position: "top-end",
        icon: isSuccess ? "success" : "error",
        title: message,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        background: isSuccess ? "green" : "red", 
        color: "#fff", 
        iconColor: "#fff", 
        customClass: {
            popup: `rounded-xl shadow-lg border ${isSuccess ? "border-green-800" : "border-red-800"} font-semibold text-white px-4 py-3`,
            title: `text-white`,
        },
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });
};

export default AlertBox;
