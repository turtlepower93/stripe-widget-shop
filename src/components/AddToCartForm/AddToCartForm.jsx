import { Controller,useForm } from 'react-hook-form'
import { FormControl } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState, } from 'react';
import { Widgets } from '@material-ui/icons';

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

export default function AddToCartForm({ widget, changeWidgetQuantity }) {

    const selectQuantity = [1,2,3,4,5,6,7];
    const classes = useStyles();
    const [data, setData] = useState(null);
    const { register, reset, setValue, handleSubmit, control } = useForm({
        defaultValues: {
            "quantityToBuy": 1,
            "widgetId": widget._id,
        },
    });


    const handleAddToCart = (widget) => {
        console.log(widget.widgetId, widget.quantityToBuy)
        changeWidgetQuantity(widget.widgetId, widget.quantityToBuy);
    };

    useEffect(() => {
        reset({
            "quantityToBuy": 1,
            "widgetId": widget._id,
        });
    },[widget])

    async function updateCart(widget) {
        await setData(widget);
        handleAddToCart(widget)
    };

return (    
    <form onSubmit={handleSubmit((widget) => updateCart(widget))} >
        <CardActions className={classes.centerFormData}>
            <Button
                color="primary"
                variant="contained"
                className={classes.addButton}
                // onClick={handleAddToCart}
                label="Add To Cart"
                id={widget._id}
                type=''
                >
                    Add To Cart
                </Button>
                    <Controller
                        control={control}
                        name="quantityToBuy"
                        render={
                            ({ field }) => {
                                const amount = selectQuantity.map((quantity) => {
                                    return <MenuItem key={quantity} value={quantity}>{quantity}</MenuItem>
                                })
                                return (
                                    <Select
                                    {...field}
                                    name="quantityToBuy"
                                    variant='outlined'
                                    color="primary"
                                    >
                                        {amount}
                                    </Select>
                                )
                            }
                        }
                    / >
        </CardActions>
    </form>
)}
