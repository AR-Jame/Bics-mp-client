import { NavLink } from "react-router-dom";

const Programs = () => {
    return (
        <div>
            <NavLink to={'/dashboard/create-program'}>
            <button className="btn">Create new Program</button>
            </NavLink>
        </div>
    );
};

export default Programs;