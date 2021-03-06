import React from "react"
import Aux from "../AuxHoc/AuxHoc"
import classes from "./Layout.module.css"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar" 
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"
import { connect } from "react-redux"


class Layout extends React.Component{
    constructor(){
        super()
        this.state={
            showSideDrawer:false
        }
    }
    
    closeSideDrawerHandler = () => {
        this.setState({
            showSideDrawer:false
        })
    }

    sideDrawerToggleHandler = () =>{
        this.setState((prevState)=>{
            return {
                showSideDrawer:!prevState.showSideDrawer
            }
        })
    }

    render(){
        return(
                <Aux >
                <Toolbar 
                isAuth= {this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler}/>
                 <SideDrawer  
                   isAuth= {this.props.isAuthenticated}
                 openSideDrawer={this.state.showSideDrawer} closed={this.closeSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                </Aux>
        )
    }
} 

const mapStateToProps = (state) => {
return {
    isAuthenticated: state.auth.token !== null
}
}

export default  connect(mapStateToProps)(Layout)