function RightSidebar() {
  return (
    <>
      <div className="fields-top">
    <div className=" fields-name">Fields</div>
    <div className="flex fields-list">
     <span>
        Regular Field
        </span>
        <span>
        Columns Field
        </span>
    </div>
    </div>
    <ul>
    <li className="card">
<div className="flex card-left">
<div className="card-initial">
      SD
      </div>
      <div>
        Customer Name
        <div className="card-name">
          MR JOHN DOE
          <span>Marked as missing</span>
        </div>
      </div>
      </div>
      <div className="card-right flex">
      <input type="checkbox"/>
      <div className="dot">
        <img src="../../dot.png"/>
      </div>
      </div>
    </li>
    </ul>
    <div className="flex fields-bottom">
      <button>
        Select All
      </button>
      <button>
       Confirm
      </button>
    </div>
    </>
  );
 
}

export default RightSidebar;
