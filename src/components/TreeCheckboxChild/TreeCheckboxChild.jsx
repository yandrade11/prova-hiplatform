import React, { useContext } from "react";
import { contextChildrenToParents } from "../../context/contextChildrenToParents";
import "./TreeCheckboxChild.scss";

export default function TreeCheckboxChild(props) {
  //erro aqui, parentCheckbox undefined
  const { parentCheckbox } = useContext(contextChildrenToParents);

  return (
    <div>
      <div className="tree-checkbox-list__item">
        <form>
          <input
            type="checkbox"
            id={props.id}
            name={props.name}
            onChange={(event) => {
              props.click(parentCheckbox, props.childData);
            }}
          />

          <label htmlFor={props.name} className="label-checkbox">
            {props.label}
          </label>
        </form>
      </div>
    </div>
  );
}
