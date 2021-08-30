import React, { Component } from 'react';
import Loader from './loader';

class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
           data : [],
           isLoaded : false
        }
     }

     componentDidMount() {
        fetch('../json/pokemon.json')
          .then(res => res.json())
          .then(
            (result) => {
              setTimeout(function() {
              this.setState({
                isLoaded: true,
                data: result
              });
            }.bind(this), 2000)
            },
            // error handler
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    render() { 
        const { isLoaded, data } = this.state || {}; 
        return (
            <div className="container-fluid content-wrapper">
                <div className="row">
                { !isLoaded ? <Loader /> :
                    Object.entries(data.entries).map( pokemon => {
                        return (
                        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12">
                          <div className="card">
                            <img src={pokemon[1].image.url} className="card-img-top img-responsive" alt="..." />
                            <div className="card-body">
                              <div className="number">#{ ('00' + pokemon[1].number).slice(-3) }</div>
                              <div className="name">{ pokemon[1].name }</div>
                              { pokemon[1].types.map(type => {
                                return (<span className={type && "type-label "+type}>{type}</span>)
                              }) }
                            </div>
                          </div>
                        </div>
                      )
                    })
                }
                </div>
            </div>
        );
    }
}
 
export default Content;