interface IOpenweatherResponse {
  main: {
    temp: number;
    feels_like: number;
  };
  weather: [
    {
      description: string;
    }
  ];
  dt_txt: string;
}

export default IOpenweatherResponse;
