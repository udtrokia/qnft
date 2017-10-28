
import React,{Component} from 'react';
import $ from 'jquery'
import {
    Button,
    Col,
    Card,
    CardImg,
    CardBody,
    CardText,
    ButtonGroup,
    ButtonToolbar    
}from 'reactstrap'
import logo from './logo.svg';
import './App.css';
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

export default class Index extends Component{
    constructor(props){
	super(props)
	this.state={
	    files:[],
	    preview:'',
	    showPreview:false,
	    showUpload:false,
	    loading:false,
	    page:0,
	    fotoList:[],
	    listLen:0
	}
    }
    componentWillMount(){
	let hash = this.props.location.hash
    }
    componentDidMount(){
	this.getList(this.state.page)
    }
    getList=(page)=>{
	let options={
	    col:{},
	    page:page
	}
	$.get('http://upload.udtrokia.com/mongo',options,(res)=>{
	    this.setState({fotoList:res})
	})
    }
    thumb=(foto)=>{
	let options={
	    url:foto.url,
	    thumb:Number(foto.thumb)+1
	}
        $.ajax({
	    url: 'http://upload.udtrokia.com/mongo',
	    type:'put',
	    dataType:'JSON',
	    data:options,
	    success: function(res) {
		alert('点赞成功! 刷新后查看~')
	    }
	});
    }
    fotoList=()=>{
	const fotoList = this.state.fotoList.map((foto)=>{	    
	    return(
		    <Col key={foto.url} className="mb-2">
		    <Card style={{width:'20rem'}} style={{display:'inline-block'}}>
		    <CardImg top style={{width:"20rem"}} src={foto.url} alt="Card image cap" />		    
		    <CardBody>
		    <CardText>拍客:{foto.name}</CardText>
		    <Button
		color="primary"
		style={{borderRadius:25}}
		onClick={()=>this.thumb(foto)}
		    >{foto.thumb}<span> 👍</span></Button>
		    </CardBody>
		    </Card>
		    </Col>
	    )
	})
	return <div className="text-center">{fotoList}</div>
    }
    gohash=(n)=>{
	let page = this.state.page
	this.setState({
	    page:page+n
	})
	this.getList(page+n)
    }
    paginList=()=>{
	let page=this.state.page
	return(
		<ButtonToolbar className="text-center m-3">
		<Col>
		<ButtonGroup>
		<Button  onClick={()=>this.gohash(-1)}>{"<"}</Button>
		<Button color="primary"  onClick={()=>this.gohash(0)}>{page+1}</Button>
		<Button  onClick={()=>this.gohash(1)}>{page+2}</Button>
		<Button  onClick={()=>this.gohash(2)}>{page+3}</Button>
		<Button  onClick={()=>this.gohash(3)}>{page+4}</Button>
		<Button  onClick={()=>this.gohash(4)}>{page+5}</Button>
		<Button  onClick={()=>this.gohash(5)}>{page+6}</Button>
		<Button  onClick={()=>this.gohash(6)}>{page+7}</Button>
		<Button  onClick={()=>this.gohash(1)}>{">"}</Button>
		</ButtonGroup>
		</Col>
		</ButtonToolbar>
	)
    }
    render() {
	return (
	        <div className="App">
		<header className="App-header">
		<img src={logo} className="App-logo" alt="logo" />
		<h1 className="App-title">照片列表</h1>
		</header>
		<p className="App-intro mt-3">
		觉得拍的还不错就点个赞吧~
	    </p>
		{this.fotoList()}	    
	    {this.paginList()}
		<div style={{height:"5rem",backgroundColor:'#222',bottom:0}} />
		</div>
	);
    }
}
