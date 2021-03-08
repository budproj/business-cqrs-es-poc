import { Action } from '@infrastructure/bus/action/action'
import { ObjectLiteral } from '@core/common/types/object-literal.type'

export abstract class Command<D extends ObjectLiteral = ObjectLiteral> extends Action<D> {}
