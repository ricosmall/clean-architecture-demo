import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import logo from "./logo.png";
import reactLogo from "./react-logo.png";
import { useCartBloc } from "../app/app";
import { useBlocState } from "../common/use-bloc-state";

const useStyles = makeStyles(() => ({
    toolbar: {
        justifyContent: "space-between",
        maxWidth: "800",
    },
}));

const MyAppBar: React.FC = () => {
    const classes = useStyles();
    const bloc = useCartBloc();
    const state = useBlocState(bloc);

    const totalItems = state.kind === "UpdatedCartState" ? state.totalItems : 0;

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <div>
                    <img src={logo} width={150} alt="logo" />
                    <img src={reactLogo} width={40} alt="react logo" />
                </div>

                <IconButton color="inherit">
                    <Badge badgeContent={totalItems} color="secondary">
                        <ShoppingCartIcon onClick={() => bloc.openCart()} />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar;
