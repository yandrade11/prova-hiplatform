import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Arrow from "../../assets/images/arrow.png";

import CheckboxChild from "../TreeCheckboxChild/TreeCheckboxChild";
import { contextChildrenToParents } from "../../context/contextChildrenToParents";
import "./TreeCheckbox.scss";

export default function TreeCheckbox() {
  const [dataJson, setdataJson] = useState({});
  const [selectChilds, setSelectChilds] = useState([]);

  //estado para verificar se todos os filhos estão marcados
  const [allChecked, setAllChecked] = useState([]);

  //chamada contextAPI
  const { setParentCheckbox } = useContext(contextChildrenToParents);

  //baixa json OK
  useEffect(() => {
    const showName = async () => {
      const baseUrl = window.location.href;

      await axios
        .get(`${baseUrl}/data.json`)
        .then((response) => {
          setdataJson(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    showName();
  }, []);

  //tratando drop-down icone OK
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

  //tratando clique do pai OK
  const handleParentCheckboxClick = (event) => {
    //garantia de que estamos tratando o pai
    if (!event.target.id.includes("parent")) return;

    //pega id do checkbox pai selecionado
    const targetCheckboxId = event.target.value;

    //pega todos os filhos do pai clicado
    const allCheckboxesInGroup = document.querySelectorAll(
      `ul.treeCheckboxChild-${targetCheckboxId} input[type="checkbox"]`
    );

    // setSelectChilds(allCheckboxesInGroup);

    // para cada filho do mesmo pai, se o pai tiver checkado todos os filhos tbm
    for (let checkbox of allCheckboxesInGroup) {
      checkbox.checked = event.target.checked ? true : false;
    }
  };

  //FALTA FAZER
  const handleChildCheckboxClick = async (event) => {
    // não entendi pq não consigo pegar
    // if (!event.target.id.includes("child")) return;

    const allCheckboxesInGroup = document.querySelectorAll(
      `ul.treeCheckboxChild-${event} input[type="checkbox"]`
    );
    setSelectChilds(allCheckboxesInGroup);

    setAllChecked(
      Array.from(allCheckboxesInGroup).filter((checkbox) => checkbox.checked)
    );

    console.log(allChecked);
  };

  useEffect(() => {

  }, []);

  return (
    <div>
      <ul className="tree-checkbox-list">
        {Object.keys(dataJson).map((keyName, i) => (
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
                    onChange={(event) => {
                      handleParentCheckboxClick(event);
                    }}
                  />

                  <label
                    htmlFor={"parent-checkbox-" + i}
                    className="label-checkbox"
                  >
                    {dataJson[keyName].name}
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
              {Object.keys(dataJson[keyName].children).map((keys, i) => (
                <li
                  className="tree-checkbox-list__input child-checkbox"
                  key={i}
                >
                  <CheckboxChild
                    label={dataJson[keyName].children[keys].name}
                    name={"child-checkbox-" + i}
                    id={"child-checkbox-" + i}
                    childData={i}
                    // checked={selectedIds.includes(keys.id)}
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
