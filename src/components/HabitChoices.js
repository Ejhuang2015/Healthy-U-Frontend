import React from "react";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import Grid from "@material-ui/core/Grid";
import { VeggiesCard } from ".";
import { ExerciseCard } from ".";
import { HydrationCard } from ".";
import { MeditationCard } from ".";

const options = [
  { value: "one", label: "Exercise 30+ minutes" },
  { value: "two", label: "Eating 5-9 Veggies/Day" },
  { value: "three", label: "Meditation" },
  { value: "four", label: "Drink 8 glasses of water/Day" },
  { value: "five", label: "Sleep 7-9 hours/Day" },
];

const styleObj = {
  fontSize: 16,
  color: "#4a54f1",
  textAlign: "center",
  paddingTop: "15px",
};

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
      <div>
        <p style={styleObj}>Move Your Selected Habits to the Right:</p>
        <DualListBox
          options={options}
          selected={selected}
          onChange={this.onChange}
        />
        <Grid item md={3}>
          <MeditationCard number="3" />
        </Grid>
        <Grid item md={3}>
          <HydrationCard number="4" />
        </Grid>
        <Grid item md={3}>
          <ExerciseCard number="1" />
        </Grid>
        <Grid item md={3}>
          <VeggiesCard number="2" />
        </Grid>
      </div>
    );
  }
}

export default HabitChoices;
