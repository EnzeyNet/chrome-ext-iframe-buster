import ExtEventer from '../helpers/eventer'
import extentionActions from './messageActions'

const extEventer = new ExtEventer()
extEventer.enableActionsListener()

for (const [actionName, action] of extentionActions) {
    extEventer.addAction(actionName, action)
}

export default extEventer
