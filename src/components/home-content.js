import React from "react";

const HomeContent = () => (
  <div className="next-steps">
    <h2 className="my-5 text-center">Build A Healthy You!</h2>

    <div className="row">
      <div className="col-md-5 mb-4">
        <h6 className="mb-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://symboliamag.com/3-benefits-of-using-a-habit-tracker/"
          >
            <i className="fas fa-user-edit mr-2" />
            Track Your Habits!
          </a>
        </h6>
        <p>
          Tracking your daily habits will help reinforce and solidify good habits.
          This is a valuable tool to measure your progress and allows you to see
          and visualize your success! Great for your physical and mental health!
        </p>
      </div>

      <div className="col-md" />

      <div className="col-md-5 mb-4">
        <h6 className="mb-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.cdc.gov/nutrition/data-statistics/plain-water-the-healthier-choice.html"
          >
            <i className="fas fa-faucet mr-2" />
            Drink Your Water!
          </a>
        </h6>
        <p>
          Drinking the recommended daily ammount of water has many advantages and is 
          important for your health. Not only will drinking water prevent dehydration,
          but it can affect your mood and even digestive health. Drink your water!
        </p>
      </div>
    </div>

    <div className="row">
      <div className="col-md-5 mb-4">
        <h6 className="mb-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.heart.org/en/healthy-living/healthy-eating/add-color/fruits-and-vegetables-serving-sizes"
          >
            <i className="fas fa-carrot mr-2" />
            Eat Fruits and Veggies Daily!
          </a>
        </h6>
        <p>
          Eating fruits and vegetables daily is import for your body to get
          the vitamins and nutrients it needs. These vitamins and nutrients 
          will help your body operate at max levels and will help you feel
          great!
        </p>
      </div>

      <div className="col-md" />

      <div className="col-md-5 mb-4">
        <h6 className="mb-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://fitbuddha.com/tips-for-building-sustainable-habits/"
          >
            <i className="fas fa-fist-raised mr-2" />
            Build Healthy and Sustainable Habits!
          </a>
        </h6>
        <p>
          Having consistency with healthy choices can be very hard. And approaching anything
          with an 'all or nothing' mindset will often set you up for failure. Being accountable 
          and establishing realistic expectations are a great place to start building sustainable
          habits. You can do it!
        </p>
      </div>
    </div>
  </div>
);

export default HomeContent;
