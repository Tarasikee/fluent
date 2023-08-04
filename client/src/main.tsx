import './index.css'
import { App, ConfigProvider } from 'antd'
import AppPage from '~/app/App.page'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setupStore } from '~/store/store'

const root = document.getElementById('root')

if (!root) {
    throw new Error('No root element')
}

createRoot(root).render(
    <StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#000000',
                },
            }}
        >
            <App>
                <Provider store={setupStore()}>
                    <BrowserRouter>
                        <AppPage/>
                    </BrowserRouter>
                </Provider>
            </App>
        </ConfigProvider>
    </StrictMode>,
)
