import { useGlobalContext } from "../../context"
import { options } from "./options"

const Selection = () => {
    const { gameOptions, handleSelectionChange } = useGlobalContext()
    return (
        <>
            <div className="selection-container">
                <label className="label" htmlFor="category">
                    Category:
                </label>
                <select
                    name="category"
                    id="category"
                    onChange={handleSelectionChange}
                    value={gameOptions.category}
                >
                    <option value="">Any Category</option>
                    {Object.keys(options).map((key) => {
                        return (
                            <option key={key} value={key}>
                                {options[key]}
                            </option>
                        )
                    })}
                </select>
            </div>

            <div className="selection-container">
                <label className="label" htmlFor="difficulty">
                    Difficulty:
                </label>

                <select
                    name="difficulty"
                    id="difficulty"
                    onChange={handleSelectionChange}
                    value={gameOptions.difficulty}
                >
                    <option value="">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            <div className="selection-container">
                <label className="label" htmlFor="type">
                    Type of questions:
                </label>
                <select
                    name="type"
                    id="type"
                    onChange={handleSelectionChange}
                    value={gameOptions.type}
                >
                    <option value="">Any Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True Or False</option>
                </select>
            </div>
        </>
    )
}

export default Selection
