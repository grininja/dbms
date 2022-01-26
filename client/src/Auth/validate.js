export const validEmail = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const validusername = new RegExp(/^[A-Za-z0-9]{3,20}$/i);


export const validFirstName = new RegExp("^[a-zA-Z]+$");
export const validLastName = new RegExp("^[a-zA-Z]+$");
