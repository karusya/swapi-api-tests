const logResponse = async (responsePromise)=> {
  try {
      let response = await responsePromise;
      console.log(
          `took: ${response.timingPhases.total.toFixed()} ms`
      );
  } catch (error) {
      if (error.response) {
          console.warn(
              `took: ${error.response.timingPhases.total} ms`
          );
      } else {
          console.warn(error.message || error);
      }
  }
}

module.exports = logResponse;
