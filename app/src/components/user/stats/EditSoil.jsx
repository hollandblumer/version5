import React, { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Suggestion, UserSuggestion } from "../../../models";
import { useParams } from "react-router-dom";
import SuggestionFromUser from "../SuggestionFromUser";

function EditSoil({ brandArray }) {
  const [truePromiseList, setTruePromiseList] = useState([]);
  const [falsePromiseList, setFalsePromiseList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [maxBrands, setMaxBrands] = useState(true);
  const [userp, setUserp] = useState("");
  // need to change to actual user
  const url = useParams();
  console.log(url);

  function handleChecked(value) {
    /*     let tempList = ["gatorade"];
    setCheckedList(tempList); */
    let tempList = checkedList;
    tempList.includes(value)
      ? (tempList = tempList.filter((item) => item != value))
      : tempList.push(value);
    tempList.length <= 7 ? setMaxBrands(true) : setMaxBrands(false);
    setCheckedList(tempList);
  }

  const updateBrandList = async (e) => {
    e.preventDefault();
    let trueList = [];
    let falseList = [];
    truePromiseList.map((object) => {
      checkedList.includes(object.businessname)
        ? trueList.push(object)
        : falseList.push(object);
    });

    trueList.map((object) => updateTrueSuggestion(object));
    falseList.map((object) => updateFalseSuggestion(object));
    // checkedList.map((s) => <UpdateSoil suggestion={s} user={"eleanorb"} />);
  };

  const updateTrueSuggestion = async (object) => {
    console.log("t", object);
    await DataStore.save(
      Suggestion.copyOf(object, (updated) => (updated.show = true))
    );
  };
  const updateFalseSuggestion = async (object) => {
    console.log("f", object);
    await DataStore.save(
      Suggestion.copyOf(object, (updated) => (updated.show = false))
    );
  };

  // checkBrands does not yet check to make sure the brands already exist in user's suggestion database
  const checkBrands = async () => {};

  useEffect(() => {
    const getData = async () => {
      try {
        const trueList = await DataStore.query(UserSuggestion, (c) =>
          c.and((c) => [c.user.name.eq(url.name), c.suggestion.show.eq(true)])
        );

        const falseList = await DataStore.query(UserSuggestion, (c) =>
          c.and((c) => [c.user.name.eq(url.name), c.suggestion.show.eq(false)])
        );

        let trueListPromiseArray = [];
        let falseListPromiseArray = [];

        trueList.map((p) => trueListPromiseArray.push(p.suggestion));
        falseList.map((p) => trueListPromiseArray.push(p.suggestion));

        await Promise.all(trueListPromiseArray).then((values) => {
          setTruePromiseList(values);
        });

        await Promise.all(falseListPromiseArray).then((values) => {
          setFalsePromiseList(values);
        });
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  let duplicateArray = [];
  truePromiseList.map((p) => duplicateArray.push(p.businessname));

  falsePromiseList.map((p) => duplicateArray.push(p.businessname));

  let uniqueArray = [...new Set(duplicateArray)];
  let actualArray = Array.from(uniqueArray);

  return (
    <div>
      <h2>Select up to 7 brands</h2>
      {actualArray.map((item, index) => (
        <form key={index}>
          {item}
          <input
            type="checkbox"
            name={item}
            value={item}
            onChange={() => handleChecked(item, index)}
          />
        </form>
      ))}
      {maxBrands ? (
        <button className="save-soil" onClick={updateBrandList}>
          {" "}
          Submit Changes
        </button>
      ) : (
        <div>Too many brands</div>
      )}
    </div>
  );
}

export default EditSoil;
