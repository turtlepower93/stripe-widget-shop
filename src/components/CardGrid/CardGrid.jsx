import { useEffect, useState, } from 'react';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import * as widgetsAPI from '../../utilities/widgets-api';
import { FormControl } from '@material-ui/core';
import { Controller } from 'react-hook-form'
import { useForm } from "react-hook-form";
import AddToCartForm from '../AddToCartForm/AddToCartForm'
// import pic from './uselessbowl.JPG'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 280,
        margin: "0 auto",
    },
    addToCart: {
        display:"flex",
        justifyContent:"space-around",
        width:'100%',
    },
    centerFormData: {
        justifyContent:'space-around',
    }
})

export default function CardGrid({widgets, changeWidgetQuantity }) {

    const { register, reset, setValue, handleSubmit, control } = useForm({
        defaultValues: {"quantityToBuy": 1},
    });
    const [selectQuantity, setSelectQuantity] = useState([1,2,3,4,5,6,7]);

    const classes = useStyles();
    const [data, setData] = useState(null);
    const [widgetIds, setWidgetIds] = useState([]);

    const changeTabResetSelectValues = false;

    const widgetsDisplayed = widgets.map((w,idx) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={4} >
                <Card>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={"/widgetImages/widget.PNG"}
                            
                            />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {w.name}
                            </Typography>
                            <Typography variant="body1" component="p">
                                {w.description}
                            </Typography>
                        </CardContent>
                        </CardActionArea>
                        <CardContent>
                            <Typography
                                align="center"
                                color="primary"
                                variant="h4"
                                >
                                {w.price}.00$
                            </Typography>
                        </CardContent>
                    <AddToCartForm changeWidgetQuantity={changeWidgetQuantity} widget={w}></AddToCartForm>
                </Card>
            </Grid>
        )
    });

    return (
        <>
            <Grid container spacing={5}>
                {widgetsDisplayed}
            </Grid>    
        </>
    );
};
                                // <Select
                                //     variant='outlined'
                                //     defaultValue="1"
                                //     color="primary"
                                //     name={w._id}
                                //     onChange={(evt) => handleQuantityChange(evt)}
                                // >
                                //     <MenuItem value={1}>1</MenuItem>
                                //     <MenuItem value={2}>2</MenuItem>
                                //     <MenuItem value={3}>3</MenuItem>
                                //     <MenuItem value={4}>4</MenuItem>
                                //     <MenuItem value={5}>5</MenuItem>
                                //     <MenuItem value={6}>6</MenuItem>
                                //     <MenuItem value={7}>7</MenuItem>
                                //     <MenuItem value={8}>8</MenuItem>
                                // </Select>