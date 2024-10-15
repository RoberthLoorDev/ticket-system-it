const LOCALURL = "http://localhost:3000/api/v1";

//log in
export const logIn = async (email: string, password: string) => {
     try {
          const response = await fetch(`${LOCALURL}/login`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({ email, password }),
          });

          if (response.status === 404) throw new Error("User no found");
          if (response.status === 401) throw new Error("Incorrect Password");

          const dataUser = await response.json();
          console.log(dataUser);
          return dataUser;
     } catch (error) {
          console.error(error);
          throw new Error("Error Server");
     }
};
