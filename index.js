// Insurance company Inc
//List of department .1 claimHistory,2.policyDepartment 3. accountDepartment
// Action taking 1.createPolicy 2.createClaim 3.deletePolicy
// To create policy we need name,amount,age,address
// To create Claim 

const createPolicy =(name,amount,age,address)=>{
 
  return{
     type: "CREATE_POLICY",
     payload:{
       name:name,
       amount:amount,
       age:age,
       address:address

     }

  }

};

const createClaim =(name,amount)=>{
 return{

    type:"CREATE_CLAIM",
    payload:{
       name: name,
       amount: amount

    }
 }

};

const deletePolicy =(name)=>{

  return{
      type: "DELETE_POLICY",
      payload:{
         name: name

      }
  }

};

// Reducer 
// customer need to create claim for certain amount of money
const claimHistoryDepartment =(oldListOfClaim = [], action)=>{
    
   if( action.type === "CREATE_CLAIM"){
       return [...oldListOfClaim,action.payload];
     
   };
     return oldListOfClaim
};
// new customer is trying to register new policy
const policeDepartment =(oldlistOfCustomers =[],action)=>{
   
   if (action.type === "CREATE_POLICY"){

      return [...oldlistOfCustomers,action.payload.name]
   }else if(action.type === "DELETE_POLICY"){
       return oldlistOfCustomers.filter((customer)=>{customer != action.payload.name})
   }
   
     return oldlistOfCustomers
}
// I need account to handle createClaim,createPolice
const accountDepartment =(bankOfMoney = 1000,action)=>{

    if(action.type === "CREATE_CLAIM"){
        return bankOfMoney - action.payload.amount
    }else if (action.type === "CREATE_POLICY"){
        return bankOfMoney + action.payload.amount
    }

     return bankOfMoney
};

const { createStore, combineReducers } = Redux;

const allDepartment = combineReducers({
    accountDepartment:accountDepartment,
    policeDepartment:policeDepartment,
    claimHistoryDepartment:claimHistoryDepartment

})





const store = createStore(allDepartment)
const action = createPolicy("james",200,34,"116 pearl bate")
store.dispatch(action)
console.log(store.getState())
