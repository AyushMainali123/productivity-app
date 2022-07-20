type differenceIn = "ms" | "sec" | "min" | "hour"


export const dateDifference = (a: Date, b: Date, difference: differenceIn  ) => {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds());

  switch(difference) {
      case "ms":
        return (utc2 - utc1) / 1;
      case "sec":
        return (utc2 - utc1) / 1000;
      case "min":
        return (utc2 - utc1) / (1000 * 60);
      case "hour":
        return (utc2 - utc1) / (1000 * 60);
      default:
       return (utc2 - utc1) / 1;
  }
 
}