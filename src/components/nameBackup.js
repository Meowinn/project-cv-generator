import React, {Component} from 'react';

class Summary extends Component{
    constructor(props){
        super(props);

        this.editSumF = this.editSumF.bind(this);
        this.submitSumF = this.submitSumF.bind(this);
        this.cancelSumF = this.cancelSumF.bind(this);

        this.addWorkExp = this.addWorkExp.bind(this);
        this.saveExpF = this.saveExpF.bind(this);

        this.state = {
            newSum: '',
            sumText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae rhoncus velit. Nullam vitae nisi mauris. In quam libero, consectetur at rhoncus eget, sodales ut neque. Nullam congue augue nec viverra gravida. Nunc dapibus ut orci nec rhoncus. Quisque gravida ex nisi, nec pharetra orci tincidunt eu. Sed non neque congue metus tristique gravida eget eget mauris. Phasellus eu nibh non erat congue convallis. Praesent faucibus pretium tellus, id hendrerit libero sagittis id.',
            oldSum: '',
            
            workExps: {
                Exp: 'Cook',
            },
            expArray: [],
            optArray: [[]] 
        }
    }

    editSumF(){
        this.setState({
            oldSum: this.state.sumText,
            newSum: this.state.oldSum,
            sumText: <SummaryForm handleChangeSum={this.handleChangeSumF} submitSum={this.submitSumF} cancelSum={this.cancelSumF} sumPlaceholder={this.state.sumText}/>
        })
        document.querySelector('#editSumbtn').classList.add('hideBtn');
    }

    handleChangeSumF = (e) => {
        this.setState({
            newSum: e.target.value,
        }) 
    }

    submitSumF(e){
        e.preventDefault();

        if(this.state.newSum == ''){
            this.setState({
                sumText: this.state.oldSum,
            })
        }else{
            this.setState({
                oldSum: this.state.newSum,
                sumText: this.state.newSum,
            })   
        }
        document.querySelector('#editSumbtn').classList.remove('hideBtn');
    }

    cancelSumF(){
        this.setState({
            sumText: this.state.oldSum,
        })
        document.querySelector('#editSumbtn').classList.remove('hideBtn');
        console.log('cancelled');
    }

    addWorkExp() {
        console.log('add work exp clicked!');

        this.setState({
            workExps: {
                Exp: <WorkExpForm saveExp={this.saveExpF}/>
            },
    

        })
    }

    saveExpF(e) {
        e.preventDefault();
        console.log('saved!')

        const jobInput = document.querySelector('#jobInput');
        const companyInput = document.querySelector('#companyInput');

        this.setState({

            workExps: {
                // Exp: <Experiences expItems='ur gae'/>
            },
            expArray: this.state.expArray.concat(jobInput.value, companyInput.value),
            
            optArray: [this.state.expArray]
            
        })

        console.log(this.state.expArray)
    }

    render(){
        return(
            <div>
                <div className='sumDiv'>
                    <div>Summary:</div>
                    <button type='button' onClick={this.editSumF} id='editSumbtn'>Edit</button>
                    <div>{this.state.sumText}</div>
                </div>
                <br></br>
                <div className='workExpDiv'>
                    <div>Work Experience</div>
                    <button type='button' onClick={this.addWorkExp}>Add</button>
                    <div>{this.state.workExps.Exp}</div>
                    <div>
                    {this.state.expArray.map((item, i) =>
                        <Experiences key={i} expItems={`${item}`} />  )}
    
                    </div>
                </div>
            </div>
        )
    }
}

class SummaryForm extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <form>
                <textarea onChange={this.props.handleChangeSum} id= 'newSummary' cols={30} rows={10} defaultValue={this.props.sumPlaceholder}></textarea>
                <div>
                    <button type='submit' onClick={this.props.submitSum}>Submit</button>
                    <button type='button' onClick={this.props.cancelSum}>Cancel</button>
                    </div>
            </form>
        )
    }
}

class WorkExpForm extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <form>
                <div>
                    <label htmlFor='jobInput'>Job Title: </label>
                    <input type='text' id='jobInput'></input>
                </div>

                <div>
                <label htmlFor='companyInput'>Company: </label>
                    <input type='text' id='companyInput'></input>
                </div>



                <button type='button' onClick={this.props.saveExp}>Save</button>
            </form>
        )
    }
}



class Experiences extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div id='experiencesContainer'>{this.props.expItems}</div>
        )
    }
}

export default Summary;
