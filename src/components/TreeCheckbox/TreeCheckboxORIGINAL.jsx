import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Arrow from "../../assets/images/arrow.png";

import CheckboxChild from "../TreeCheckboxChild/TreeCheckboxChild";
import { contextChildrenToParents } from "../../context/contextChildrenToParents";
import "./TreeCheckbox.scss";

export default function TreeCheckbox() {
  const [indexName, setIndexName] = useState({});

  //chamada contextAPI
  const { setParentCheckbox } = useContext(contextChildrenToParents);

  //baixa json
  useEffect(() => {
    const showName = async () => {
      const baseUrl = window.location.href;

      await axios
        .get(`${baseUrl}/data.json`)
        .then((response) => {
          setIndexName(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    showName();
  }, []);

  //tratando drop-down icone
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

      setParentCheckbox("");
    } else {
      treeCheckboxChild.classList.remove("close-list");
      treeCheckboxChild.classList.add("open-list");

      setParentCheckbox(i);
    }
  };

  //trata pai: se selecionar o pai, seleciona todos os filhos
  const handleParentCheckboxClick = (i) => {
    let allCheckbox = document.querySelectorAll(
      `ul.treeCheckboxChild-${i} input[type="checkbox"]`
    );
    let parentCheckbox = document.querySelector("#parent-checkbox-" + i);

    for (let checkbox of allCheckbox) {
      if (parentCheckbox.checked) checkbox.checked = allCheckbox.checked = true;
      else checkbox.checked = allCheckbox.checked = false;
    }
  };

  //trata filho
  const handleChildCheckboxClick = (parentId, childId) => {
    let childCheckbox = document.querySelector("#child-checkbox-" + childId);
    let parentCheckbox = document.querySelector("#parent-checkbox-" + parentId);

    const groupChildCheckbox = document.querySelectorAll(
      `ul.treeCheckboxChild-${parentId} input[type="checkbox"]`
    );
  };

  // useEffect(() => {
  //   //percorrer o filho e verificar se todos tão marcados
  //   const allChecked = Array.from(groupChildCheckbox).every(
  //     (checkbox) => checkbox.checked
  //   );

  //   if (allChecked) {
  //     parentCheckbox.checked = true;
  //   } else {
  //     parentCheckbox.checked = indeterminate;
  //   }
  // }, [selectChild]);

  return (
    <div>
      <ul className="tree-checkbox-list">
        {Object.keys(indexName).map((keyName, i) => (
          <li className="tree-checkbox-list__input" key={i}>
            <div className="tree-checkbox-list__item">
              <div
                className="tree-checkbox-list__parent-div"
                id={"tree-checkbox-list__parent-div-" + i}
              >
                <form>
                  <input
                    type="checkbox"
                    id={"parent-checkbox-" + i}
                    name={"parent-checkbox-" + i}
                    value="0"
                    onClick={(e) => {
                      handleParentCheckboxClick(i);
                    }}
                  />

                  <label
                    htmlFor={"parent-checkbox-" + i}
                    className="label-checkbox"
                  >
                    {indexName[keyName].name}
                  </label>
                </form>

                <div>
                  <img
                    src={Arrow}
                    alt="arrow"
                    className={"icon-arrow icon-arrow-" + i + " close-arrow"}
                    onClick={(e) => {
                      handleClickArrow(i);
                    }}
                  />
                </div>
              </div>
            </div>

            <ul
              className={
                "treeCheckboxChild-" + i + " treeCheckboxChild close-list"
              }
            >
              {Object.keys(indexName[keyName].children).map((keys, i) => (
                <li
                  className="tree-checkbox-list__input child-checkbox"
                  key={i}
                >
                  <CheckboxChild
                    label={indexName[keyName].children[keys].name}
                    name={"child-checkbox-" + i}
                    id={"child-checkbox-" + i}
                    childData={i}
                    // puxa undefined do filho
                    click={handleChildCheckboxClick}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
