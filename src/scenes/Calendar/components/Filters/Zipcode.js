import React from 'react';

//Components
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { styled, withTheme } from '@material-ui/core/styles';

//State
import { actions as jobActions } from '../../../../state/jobs/jobsActions';
import { useStateValue } from '../../../../state';

//Constants
import zipcodes from '../../../../constants/zipcodes';

const StyledAutocomplete = styled(withTheme(Autocomplete))(props => ({
    width: '25%',
    marginLeft: 20,
    marginTop: -1,
    [props.theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: 0,
    },
}));

const ZipcodeFilter = () => {
    const [, dispatch] = useStateValue();

    return (
        <StyledAutocomplete
            freeSolo
            options={zipcodes}
            getOptionLabel={zipcode => `${zipcode}`}
            filterOptions={(zipcodes, state) =>
                zipcodes.filter(zip =>
                    `${zip}`.includes(state.inputValue.toLowerCase())
                )
            }
            onChange={(_, zipcode) => {
                jobActions.setZipFilter(dispatch, zipcode);
            }}
            renderInput={params => (
                <TextField
                    {...params}
                    type="number"
                    id="zipcode-filter"
                    label="Zipcode"
                    style={{ width: '100%' }}
                />
               
            )}
        />
    );
};

export default ZipcodeFilter;
