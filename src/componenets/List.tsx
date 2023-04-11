
import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { AiOutlineUserDelete } from 'react-icons/ai';
import { Ipeople } from "../App";
import Edite from "./Edite";



interface Iprops {
  peoples : Ipeople [];
  setPeoples: Dispatch<SetStateAction<Ipeople[]>>;

}  
  const List: FC<Iprops>= ({peoples , setPeoples}) => {
  const handleDeletepeople = (id:Number) : void=>{
    const persons : Ipeople[] = [...peoples]
    const filtreadpeples :Ipeople[] = persons.filter(p => p.id !== id)
    setPeoples(filtreadpeples);
  }
  const renderList : JSX.Element[] =peoples.map((people) => (
      <div key={people.id} className="col-12 col-lg-6 mb-2">
        <div className="card">
          <div className="card-bod d-flex align-items-center">
            <img className="img-fluid rounded img-thumbnail" 
            width={100} height={100} 
            src={people.img_url} 
            alt={people.fullName}/>
            <div className="me-3">
              <p>
              <span className="h2">{people.fullName}</span>
              <span className="badge bg-primary me-3">{people.age} سال </span>
              </p>
              <p className="text-muted">{people.bio}</p>
            </div>
          </div>
          <div className="operation_btns">
            <Edite people={people} peoples={peoples} setPeoples={setPeoples}/>
            <AiOutlineUserDelete 
            onClick={()=> handleDeletepeople(people.id)}
            className="text-danger m-1" 
            size={30}/>
          </div>
        </div>
      </div>
    ))

  return (
    <div className="row">
      {renderList}
    </div>
  )
}
export default List