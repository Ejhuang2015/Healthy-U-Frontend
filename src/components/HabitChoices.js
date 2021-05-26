import React from "react";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";

const options = [
  { value: "one", label: "Exercise 30+ minutes" },
  { value: "two", label: "Eating 5-9 Veggies/Day" },
  { value: "three", label: "Meditation" },
  { value: "four", label: "Drink 8 glasses of water/Day" },
  { value: "five", label: "Sleep 7-9 hours/Day" },
  { showHeaderLabels: true },
];

class HabitChoices extends React.Component {
  state = {
    selected: ["one"],
  };

  onChange = (selected) => {
    this.setState({ selected });
  };

  render() {
    const { selected } = this.state;

    return (
      <DualListBox
        options={options}
        selected={selected}
        onChange={this.onChange}
      />
    );
  }
}

export default HabitChoices;
