import { BsSearch } from "react-icons/bs";
import ProfileDetails from "../ProfileDetails";
import "./index.css";

const FiltersGroup = ({
  employmentTypesList = [],
  salaryRangesList = [],
  changeSearchInput = () => {},
  searchInput = "",
  getJobs = () => {},
  changeSalary = () => {},
  changeEmployeeList = () => {},
  selectedSalaryRangeId = "",
  selectedEmployeeTypes = [], // ✅ NEW PROP
}) => {
  const onChangeSearchInput = (event) => {
    changeSearchInput(event);
  };

  const onEnterSearchInput = (event) => {
    if (event.key === "Enter") {
      getJobs();
    }
  };

  const renderSearchInput = () => (
    <div className="search-input-container">
      <label htmlFor="searchInput" className="visually-hidden">
        Search
      </label>
      <input
        type="search"
        id="searchInput"
        className="search-input"
        placeholder="Search"
        value={searchInput}
        onChange={onChangeSearchInput}
        onKeyDown={onEnterSearchInput}
      />
      <button
        type="button"
        data-testid="searchButton"
        className="search-button-container"
        onClick={getJobs}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  );

  const onSelectEmployeeType = (event) => {
    changeEmployeeList(event.target.value);
  };

  const renderTypeOfEmployment = () => {
    if (!Array.isArray(employmentTypesList)) return null;

    return (
      <div className="employment-type-container">
        <h1 className="employment-type-heading">Type of Employment</h1>
        <ul className="employee-type-list-container">
          {employmentTypesList.map((eachEmployeeType) => (
            <li
              className="employee-item"
              key={eachEmployeeType.employmentTypeId}
            >
              <input
                type="checkbox"
                id={eachEmployeeType.employmentTypeId}
                className="check-input"
                value={eachEmployeeType.employmentTypeId}
                onChange={onSelectEmployeeType}
                checked={selectedEmployeeTypes.includes(
                  eachEmployeeType.employmentTypeId
                )} // ✅ Ensures checkbox is checked
              />
              <label
                htmlFor={eachEmployeeType.employmentTypeId}
                className="check-label"
              >
                {eachEmployeeType.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderSalaryRange = () => {
    if (!Array.isArray(salaryRangesList)) return null;

    return (
      <div className="salary-range-container">
        <h1 className="salary-range-heading">Salary Range</h1>
        <ul className="salary-range-list-container">
          {salaryRangesList.map((eachSalary) => {
            return (
              <li className="salary-item" key={eachSalary.salaryRangeId}>
                <input
                  type="radio"
                  id={eachSalary.salaryRangeId}
                  name="salary"
                  className="check-input"
                  value={eachSalary.salaryRangeId}
                  checked={eachSalary.salaryRangeId === selectedSalaryRangeId}
                  onChange={() => changeSalary(eachSalary.salaryRangeId)}
                />
                <label
                  htmlFor={eachSalary.salaryRangeId}
                  className="check-label"
                >
                  {eachSalary.label}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      <ProfileDetails />
      <hr className="horizontal-line" />
      {renderTypeOfEmployment()}
      <hr className="horizontal-line" />
      {renderSalaryRange()}
    </div>
  );
};

export default FiltersGroup;
