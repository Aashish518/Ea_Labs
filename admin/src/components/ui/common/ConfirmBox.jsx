import Swal from "sweetalert2";

const ConfirmBox = async ({
    title = "Are you sure?",
    message = "You won't be able to revert this action!",
    confirmText = "Yes, delete it!",
    cancelText = "Cancel",
    icon = "warning",
    confirmColor = "#d33",
    cancelColor = "#3085d6",
    successMessage = "Deleted successfully!",
    successTitle = "Deleted!",
    important = false, 
}) => {
    const htmlMessage = important
        ? `
            <div style="
    padding: 16px;
    background: #ffe5e5;       /* slightly darker red for better contrast */
    border-left: 6px solid #d32f2f; /* thick left border */
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1); /* subtle shadow */
    font-family: 'Segoe UI', sans-serif;
">
    <p style="
        color: #b71c1c;            /* dark red for header */
        font-weight: 700;
        font-size: 16px;
        margin-bottom: 8px;
    ">⚠ Important Action</p>
    <p style="
        font-size: 15px;
        color: #222;                /* darker text for better readability */
        line-height: 1.5;
    ">${message}</p>
</div>

        `
        : `<p style="font-size:16px;color:#444;">${message}</p>`;

    const result = await Swal.fire({
        title,
        html: htmlMessage,
        icon,
        showCancelButton: true,
        confirmButtonColor: confirmColor,
        cancelButtonColor: cancelColor,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        background: "#fff",
        color: "#333",
        reverseButtons: true,
        focusCancel: true,
        customClass: {
            popup: "rounded-2xl shadow-lg animate-fadeIn",
            confirmButton: "px-4 py-2 text-white font-semibold rounded-md",
            cancelButton: "px-4 py-2 text-white font-semibold rounded-md",
        },
    });

    if (result.isConfirmed) {
        await Swal.fire({
            title: successTitle,
            text: successMessage,
            icon: "success",
            confirmButtonColor: cancelColor,
            background: "#fff",
            color: "#333",
            timer: 2000,
        });
        return true;
    }

    return false;
};

export default ConfirmBox;
