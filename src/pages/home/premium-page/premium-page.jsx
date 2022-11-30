import { useTheme } from "@emotion/react"
import { Box } from "@mui/material";
import { tokens } from "../../../common/theme";
import Header from "../../../components/GridHeader";
import PremiumCard from "../../../components/PremiumCard";
import premiumPlan from "../../../model/premiumPlan";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkLoginStatus } from "../../../service/checkLoginStatus";
import { handleRequest, HttpRequest } from "../../../model/http_request";
import Suspense from "../../../components/LoadingSkeleton";

const PremiumPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [plans, setPlans] = useState(premiumPlan);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    let navigate = useNavigate();
    
    useEffect(() => {
        if (!checkLoginStatus()) {
            navigate("/login");
        }
        getPlans();
    }, [navigate])

    const getPlans = () => {
        let request = new HttpRequest('Get', `/plan/update/*`);
        setLoading(true);
        handleRequest(request).then((a) => {setPlans(a.data); setLoading(false)}).catch((err) => {setLoading(false); alert(err); setError(err)});
    }

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Premium Space" subtitle="Welcome to Premium Space" />
            </Box>
            <Box
            m="100px 150px 100px 150px"
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"

            gap="100px"
            >
                {
                    plans.map(
                        (plan) => {
                            return <Box key={plan.id}
                                gridColumn="span 4"
                                gridRow="span 1"
                                backgroundColor={colors.primary[400]}
                            >
                                <Suspense
                                    loading={loading}
                                    data={plans}
                                    error={error}
                                    onRetry={() => getPlans}
                                    type={'card'}
                                >
                                    <PremiumCard plan={plan}/>
                                </Suspense>
                            </Box>; 
                        }
                    )
                }
            </Box>
        </Box>
    );
}


export default PremiumPage;