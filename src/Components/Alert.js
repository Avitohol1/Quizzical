import { useGlobalContext } from "../context"

const Alert = () => {
    const { alert } = useGlobalContext()
    return (
        <div className="alert">
            <h2 className="alert-error">{alert.msg}</h2>
        </div>
    )
}

export default Alert
