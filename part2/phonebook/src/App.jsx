import { useState, useEffect } from "react";
import "./App.css";
import numberService from "./services/numbers";

const Filter = ({ filter, setFilter }) => {
  return (
    <div className="list-view">
      <h2>Filter</h2>
      <div className="grid-col-2">
        <span> Search by name: </span>
        <input
          onChange={(event) => setFilter(event.target.value)}
          value={filter}
          placeholder="Filter by name"
          style={{
            width: "100%",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        />
      </div>
    </div>
  );
};

const Persons = ({ persons, filter, handleDelete }) => {
  const confirm = (id) => {
    const result = window.confirm("Are you sure you want to delete this?");
    if (result) {
      handleDelete(id);
    }
  };

  return (
    <div className="list-view">
      <h2>Numbers</h2>
      {persons.map(
        (person) =>
          person.name.toLowerCase().includes(filter.toLowerCase()) && (
            <div className="grid-col-2" key={person.id}>
              <div className="grid-col-2">
                <p>{Capitalize(person.name)}</p>
                <p>{person.number}</p>
              </div>
              <button
                style={{ padding: "0.5rem", margin: "0.5rem", width: "100%" }}
                onClick={() => confirm(person.id)}
              >
                Delete
              </button>
            </div>
          )
      )}
    </div>
  );
};

const PersonForm = ({
  handleSubmit,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
  return (
    <>
      <h2>Add a new</h2>
      <form onSubmit={handleSubmit} className="list-view">
        <div>
          <div className="grid-col-2 full-width">
            Name:{" "}
            <input
              onChange={(event) => setNewName(event.target.value)}
              value={newName}
              placeholder="Enter name"
            />
          </div>
          <div className="grid-col-2">
            Number:{" "}
            <input
              onChange={(event) => setNewNumber(event.target.value)}
              value={newNumber}
              placeholder="Enter number"
              type="tel"
              pattern="^[0-9 \-]*$"
            />
          </div>
        </div>

        {newName.trim().length <= 1 || newNumber.trim().length <= 1 ? (
          <button
            style={{
              backgroundColor: "grey",
              padding: "0.5rem",
              margin: "0.5rem",
              width: "100%",
              cursor: "not-allowed",
            }}
            disabled
          >
            Add
          </button>
        ) : (
          <button
            style={{ padding: "0.5rem", margin: "0.5rem", width: "100%" }}
            type="submit"
          >
            Add
          </button>
        )}
      </form>
    </>
  );
};

const Notification = ({ message, messageType }) => {
  const style = {
    position: "absolute",
    top: "30px",
    zIndex: "100",
    left: "50%",
    transform: "translateX(-50%)",
    color: messageType === false ? "red" : "green",
    background: "white",
    fontSize: "20px",
    borderColor: "#242424",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const paragraphStyle = {
    margin: "0px",
  };
  if (message === null) {
    return null;
  }
  return (
    <div style={style}>
      {message.map((msg, index) => (
        <p style={paragraphStyle} key={index}>
          {msg}
        </p>
      ))}
    </div>
  );
};

const Capitalize = (string) => {
  const words = string.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(true);

  const getHook = () => {
    numberService.getAll().then((initialNumbers) => {
      setPersons(initialNumbers);
    });
  };
  useEffect(getHook, []);

  const showNotification = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = newName.trim().toLowerCase();
    const trimmedNumber = newNumber.trim();
    const existingPerson = persons.find(
      (person) => person.name.trim().toLowerCase() === trimmedName
    );

    const existingNumber = persons.find(
      (person) => person.number.trim() === trimmedNumber
    );

    if (existingPerson) {
      const confirm = window.confirm(
        `${Capitalize(
          trimmedName
        )} is already added to the phonebook, replace the old number with a new one?`
      );
      if (!confirm) {
        setMessageType(false);
        showNotification([
          `Cancelled phonenumber update for '${Capitalize(trimmedName)}.'`,
        ]);
        return;
      }
      numberService
        .update(existingPerson.id, {
          ...existingPerson,
          number: newNumber,
        })
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== existingPerson.id ? person : updatedPerson
            )
          );
          setMessageType(true);
          showNotification([`${Capitalize(trimmedName)} has been updated.`]);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error(error);
          setMessageType(false);
          showNotification([`Failed to update ${Capitalize(trimmedName)}.`]);
        });
    } else if (existingNumber) {
      showNotification([
        `${newNumber} is already added to the phonebook under a different name.`,
      ]);
      return;
    } else {
      numberService
        .create({ name: Capitalize(trimmedName), number: newNumber })
        .then((data) => {
          setPersons([...persons, data]);
          setMessageType(true);
          showNotification([`${Capitalize(trimmedName)} has been added.`]);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error(error);
          setMessageType(false);
          const errorMessage = [
            `Failed to add ${Capitalize(trimmedName)}.`,
            error.response.data.error,
            error.response.data.details,
          ];
          showNotification(errorMessage);
        });
    }
  };

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    numberService
      .delete(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setMessageType(false);
        showNotification([`${person.name} has been deleted.`]);
        // Update the page to reflect the deletion
        getHook();
      })
      .catch((error) => {
        console.log(error);
        setMessageType(false);
        showNotification([`Failed to delete ${person.name}.`]);
      });
  };

  return (
    <div
      style={{
        padding: "1rem",
        width: "100%",
      }}
    >
      <Notification message={message} messageType={messageType} />
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <Persons filter={filter} persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
