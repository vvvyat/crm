import { createRoot } from 'react-dom/client'
import { Administrator } from './components/administrator/router'
import { Manager } from './components/manager/router'
import { Student } from './components/student/router'
import { Curator } from './components/curator/router'

export const root = createRoot(document.getElementById('root')!)

root.render(<Administrator />)
//root.render(<Student />)
//root.render(<Curator />)
//root.render(<Manager />)