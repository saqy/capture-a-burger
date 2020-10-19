import React from "react"
import Aux from "../AuxHoc/AuxHoc"
import classes from "./Layout.module.css"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar" 
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"


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
                <Toolbar  drawerToggleClicked={this.sideDrawerToggleHandler}/>
                 <SideDrawer  openSideDrawer={this.state.showSideDrawer} closed={this.closeSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                </Aux>
        )
    }
} 

export default Layout