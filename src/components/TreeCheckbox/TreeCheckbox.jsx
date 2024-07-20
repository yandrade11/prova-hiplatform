import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Arrow from "../../assets/images/arrow.png";

import "./TreeCheckbox.scss";

export default function TreeCheckbox() {
  const [dataJson, setDataJson] = useState({});
  const [parentChecked, setParentChecked] = useState();
  const [selectedChildIds, setSelectedChildId] = useState([]);
  const [allChecked, setAllChecked] = useState([]);

  //baixa json
  useEffect(() => {
    const showName = async () => {
      const baseUrl = window.location.href;

      await fetch(`${baseUrl}/dataJson.json`).then((response) => {
        setDataJson(response.data);
      });

      // await axios
      //   .get(`${baseUrl}/data.json`)
      //   .then((response) => {
      //     setDataJson(response.data);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    };
    showName();
  }, []);

  const handleClickArrow = (i) => {
    let arrowIcon = document.querySelector(".icon-arrow-" + i);
    let treeCheckboxChild = document.querySelector(".treeCheckboxChild-" + i);

    //troca de ícone ao clicar
    if (arrowIcon.classList.contains("open-arrow")) {
      arrowIcon.classList.remove("open-arrow");
      arrowIcon.classList.add("close-arrow");
    } else {
      arrowIcon.classList.remove("close-arrow");
      arrowIcon.classList.add("open-arrow");
    }

    //classe auxiliar open/close list
    if (treeCheckboxChild.classList.contains("open-list")) {
      treeCheckboxChild.classList.remove("open-list");
      treeCheckboxChild.classList.add("close-list");

      // setParentCheckbox("");
    } else {
      treeCheckboxChild.classList.remove("close-list");
      treeCheckboxChild.classList.add("open-list");

      // setParentCheckbox(i);
    }
  };

  const handleClick = (event) => {
    const targetId = event.target.value;

    const allCheckboxesInGroup = document.querySelectorAll(
      `ul.treeCheckboxChild-${event} input[type="checkbox"]`
    );

    if (targetId.includes("parent")) {
      // setParentChecked(targetId);
    }

    console.log(parentChecked);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <ul className="tree-checkbox-list">
        {Object.keys(dataJson).map((keyName, index) => (
          <li className="tree-checkbox-list__input" key={index}>
            <div className="tree-checkbox-list__item">
              <div
                className="tree-checkbox-list__parent-div"
                id={"tree-checkbox-list__parent-div-" + index}
              >
                <form>
                  <input
                    type="checkbox"
                    name={"parent-checkbox-" + index}
                    id={"parent-checkbox-" + index}
                    checked={parentChecked}
                    onChange={(event) => {
                      handleClick(event);
                    }}
                    value={index.id}
                  />

                  <label
                    htmlFor={"parent-checkbox-" + index}
                    className="label-checkbox"
                  >
                    {dataJson[index].name}
                  </label>
                </form>

                <div>
                  <img
                    src={Arrow}
                    alt="arrow"
                    className={
                      "icon-arrow icon-arrow-" + index + " close-arrow"
                    }
                    onClick={(e) => {
                      handleClickArrow(index);
                    }}
                  />
                </div>
              </div>
            </div>

            <ul
              className={
                "treeCheckboxChild-" + index + " treeCheckboxChild close-list"
              }
            >
              {Object.keys(dataJson[keyName].children).map((keys) => (
                <li
                  className="tree-checkbox-list__input child-checkbox"
                  key={keys}
                >
                  <input
                    type="checkbox"
                    name={"child-checkbox-" + keys}
                    id={"child-checkbox-" + keys}
                    checked={false}
                    onChange={(event) => {
                      handleClick(event);
                    }}
                  />

                  <label htmlFor={keyName.id} className="label-checkbox">
                    {dataJson[keyName].children[keys].name}
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
