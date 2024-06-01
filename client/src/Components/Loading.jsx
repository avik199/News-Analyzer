import React from 'react'
// import loadings from "../assets/Loading_icon.gif"
import loadings from "../assets/Fidget-spinner.gif"
import dark_loadings from "../assets/fidgetspinner_better.gif"
import "../assets/loading.css"
function Loading(props) {
  return (
    <div className='text-center my-5'>
      {props.mode == "light" &&
        <img src={loadings} alt="" height="150vmin" width="150vmin" /> ||
        <img src={dark_loadings} alt="" height="200vmin" width="250vmin" />
      }
    </div>
  )
}
// const LoadingAnimation = ({ theme }) => {
//   return (
//     <div className={`loader ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}></div>
//   );
// };

export default Loading;