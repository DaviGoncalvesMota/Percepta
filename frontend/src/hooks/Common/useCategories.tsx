import { useContext } from "react"
import { UserContext } from "../../context/User/UserContext"
import { companyCategories, employeeCategories } from "../../data/categories"

export const useCategories = () => {
    const { userRole } = useContext(UserContext)
    const categories = userRole === "employer" ? companyCategories : employeeCategories
    return categories
}