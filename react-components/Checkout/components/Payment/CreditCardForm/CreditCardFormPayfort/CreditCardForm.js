import React, { useRef, useCallback, memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'

import {
  selectOrderDataParmas,
  selectOrderDataRedirectUrl
} from 'selectors/stateSelectors/checkoutSelectors'
import { selectCardFormError } from 'selectors/stateSelectors/creditCardsSelectors'
import { selectAddCardLoading } from 'selectors/stateSelectors/checkoutSelectors'
import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import { FormLoader } from 'components/SkeletonLoaders'
import withStyles from 'lib/withStyles'
import s from './CreditCardForm.module.scss'

const CreditCardForm = memo(() => {
  const formRef = useRef()
  const dispatch = useDispatch()
  const redirectUrl = useSelector(selectOrderDataRedirectUrl)
  const selectOrderDataParmasSelector = selectOrderDataParmas()
  const error = useSelector(selectCardFormError)
  const {
    access_code,
    language,
    merchant_identifier,
    merchant_reference,
    return_url,
    service_command,
    signature,
    remember_me
  } = useSelector(selectOrderDataParmasSelector)

  const isAddCardLoading = useSelector(selectAddCardLoading)

  const onLoad = useCallback(
    () => dispatch(CheckoutActions.setAddCardLoading(false)),
    []
  )

  useEffect(
    () => {
      dispatch(CheckoutActions.setAddCardLoading(true))
      if (redirectUrl) {
        formRef.current.submit()
      }
    },
    [redirectUrl]
  )

  return (
    <>
      {isAddCardLoading ? (
        <div className={s.loaderContainer}>
          <FormLoader />
        </div>
      ) : null}
      <iframe
        onLoad={onLoad}
        className={cn(s.iframe, {
          [s.hidden]: isAddCardLoading
        })}
        name="payfort_merchant_page"
        id="payfort_merchant_page"
      />
      {redirectUrl ? (
        <form
          method="POST"
          action={redirectUrl}
          target="payfort_merchant_page"
          className={s.wrapper}
          ref={formRef}
        >
          {error && <span className={s.error}>{error}</span>}
          <input type="hidden" name="access_code" value={access_code} />
          <input type="hidden" id="language" name="language" value={language} />
          <input
            type="hidden"
            name="merchant_identifier"
            value={merchant_identifier}
          />
          <input
            type="hidden"
            name="merchant_reference"
            value={merchant_reference}
          />
          <input type="hidden" name="return_url" value={return_url} />
          <input type="hidden" name="service_command" value={service_command} />
          <input type="hidden" name="remember_me" value={remember_me} />
          <input type="hidden" name="signature" value={signature} />
        </form>
      ) : null}
    </>
  )
})

export default withStyles(s)(CreditCardForm)
