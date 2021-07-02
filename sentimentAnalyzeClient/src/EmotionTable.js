import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>
          {/*You can remove this line and the line below. */}
          <table className="table table-bordered">
            <tbody>
            {
                Object.entries(this.props.emotions).map(function (emotes)
                {
                    return (
                    <tr>
                        <td>{emotes[0]}</td>
                        <td>{emotes[1]}</td>
                    </tr>
                )
                })
                
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
