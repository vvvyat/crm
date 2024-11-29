import { createRoot } from 'react-dom/client'
import { Administrator } from './components/administrator/router'
import { Manager } from './components/manager/router'
import { Student } from './components/student/router'

export const root = createRoot(document.getElementById('root')!)

root.render(<Student />)