import React from 'react';
import PropTypes from 'prop-types';

class ZipForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            zipcode: ''
        };

        this.submitZipCode = this.submitZipCode.bind(this);
    }
    render(){
        return (
            <div className="zip-form">
                <form>
                    <label htmlFor="zipcode">Zip Code</label>
                    <select onChange={this.submitZipCode}>
                        <option value="">Select a zipcode</option>
                        {this.props.zips.map(zip =>
                            <option key={zip} value={zip}>{zip}</option>
                        )}
                    </select>
                </form>
            </div>
        );
    }

    submitZipCode(e) {
        const {onSubmit} = this.props;
        onSubmit(e.target.value);
    }
}
ZipForm.propTypes = {
    zips: PropTypes.arrayOf(PropTypes.number).isRequired,
    onSubmit: PropTypes.func
};

ZipForm.defaultProps = {
    onSubmit: () => {}
};

export default ZipForm;