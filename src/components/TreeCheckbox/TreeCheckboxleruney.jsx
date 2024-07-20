import "./TreeCheckbox.scss";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Arrow from "../../assets/images/arrow.png";
import CheckboxChild from "../TreeCheckboxChild/TreeCheckboxChild";
import { contextChildrenToParents } from "../../context/contextChildrenToParents";

function TreeCheckbox() {
  const [mock, setMock] = useState(false);
  const [selectedIds, setSelectedId] = useState([]);
  const [masterCheck, setMasterCheck] = useState(false);

  //chamada contextAPI
  const { setParentCheckbox } = useContext(contextChildrenToParents);

  //baixa json
  useEffect(() => {
    const showName = async () => {
      const baseUrl = window.location.href;

      await axios
        .get(`${baseUrl}/data.json`)
        .then((response) => {
          setMock(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    showName();
  }, []);

  //toggle da setinha mostrando filhos
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

  //funcao para atualizar os dados das checkbox no estado
  const handleCheckboxChange = (event) => {
    //pego o id da checkbox clicada que é recebida no evento
    const targetId = event.target.value;

    //se o id estiver selecionado, removo, se nao, adiciono
    if (event.target.checked) {
      setSelectedId([...selectedIds, targetId]);
    } else {
      setSelectedId(selectedIds.filter((id) => id !== targetId));
    }
  };

  const handleAll = (event) => {
    //pego todos os dados
    const dataArray = Object.keys(mock).map((item, index) => item.id);

    setSelectedId(event.target.checked ? dataArray : []);
    setMasterCheck(event.target.checked);
  };

  useEffect(() => {
    const allChecked = Object.keys(mock).every((item) =>
      selectedIds.includes(item.id)
    );
    // setMasterCheck(allChecked);
  }, [selectedIds]);

  return (
    <div>
      <ul className="tree-checkbox-list">
        {Object.keys(mock).map((keyName, index) => (
          <li className="tree-checkbox-list__input" key={index}>
            <div className="tree-checkbox-list__item">
              <div
                className="tree-checkbox-list__parent-div"
                id={"tree-checkbox-list__parent-div-" + index}
              >
                <form>
                  <input
                    type="checkbox"
                    id={"parent-checkbox-" + index}
                    name={"parent-checkbox-" + index}
                    value="0"
                    checked={masterCheck}
                    onChange={(event) => {
                      handleAll(event);
                    }}
                  />

                  <label
                    htmlFor={"parent-checkbox-" + index}
                    className="label-checkbox"
                  >
                    {mock[keyName].name}
                  </label>
                </form>

                <div>
                  <img
                    src={Arrow}
                    alt="arrow"
                    className={
                      "icon-arrow icon-arrow-" + keyName + " close-arrow"
                    }
                    onClick={(e) => {
                      handleClickArrow(keyName);
                    }}
                  />
                </div>
              </div>
            </div>

            <ul
              className={
                "treeCheckboxChild-" + keyName + " treeCheckboxChild close-list"
              }
            >
              {Object.keys(mock[keyName].children).map((keys) => (
                <li
                  className="tree-checkbox-list__input child-checkbox"
                  key={keys}
                >
                  <CheckboxChild
                    label={mock[keyName].children[keys].name}
                    name={"child-checkbox-" + keys}
                    id={"child-checkbox-" + keys}
                    childData={keys}
                    checked={selectedIds.includes(keys.id)}
                    onChange={(event) => {
                      handleAll(event);
                    }}
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

export default TreeCheckbox;
