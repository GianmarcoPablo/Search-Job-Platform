
interface AlertProps {
    alert: {
        type: string;
        message: string;
    }
}

export default function Alert({ alert }: AlertProps) {

    const { type, message } = alert;

    const color = type === "error" ? "red" : "green";

    return (
        <div
            className={`px-4 py-2 text-sm text-white bg-${color}-500 rounded-md mb-3`}
        >
            <p
                className="font-semibold text-center text-lg text-red-700"
            >
                {message}
            </p>
        </div>
    )
}
