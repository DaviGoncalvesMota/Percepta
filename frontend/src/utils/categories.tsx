import { useContext } from "react"
import { UserContext } from "../context/User/UserContext"
import { companyCategories, employeeCategories } from "../data/categories"

export const Categories = () => {
    const { userRole } = useContext(UserContext)
    const categories = userRole === "employer" ? employeeCategories : companyCategories
    return categories
}