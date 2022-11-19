import { useTheme } from "@emotion/react"
import { Box } from "@mui/material";
import { tokens } from "../../../common/theme";
import Header from "../../../components/GridHeader";
import PremiumCard from "../../../components/PremiumCard";
import premiumPlan from "../../../mockData/mockPremiumPlan";


const PremiumPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const plans = premiumPlan;

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Premium Space" subtitle="Welcome to Premium Space" />
            </Box>
            <Box
            m="100px 100px 100px 100px"
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"

            gap="40px"
            >
                {
                    plans.map(
                        (plan) => {
                            return <Box key={plan.id}
                            gridColumn="span 4"
                            gridRow="span 1"
                            backgroundColor={colors.primary[400]}
                            >
                                <PremiumCard plan={plan}/>
                                </Box>; 
                        }
                    )
                }
            </Box>
        </Box>
    );
}


export default PremiumPage;