import React, { useState } from 'react'

import {
  Button, Modal,
} from 'react-bootstrap'

import theme from '../theme'

const footerStyle = {
  backgroundColor: theme.colors.grey,
  fontSize: theme.fontSizes.footer,
}

const Footer = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className="d-grid">
      <Button style={footerStyle} variant="light" onClick={handleShow} id="termsText">
        TERMS OF SERVICE, Workout Helper 2021.
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Terms of Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Header><h5>Terms and Conditions</h5></Modal.Header>
        By using this Site (the &apos;Site&apos;) you agree to be bound by and accept the
        following disclaimer along with the terms and conditions about the Site&apos;s cookie
        policy, privacy policy, availability, viruses, bugs and malicious use, intellectual
        property rights, liability and links. Please read them carefully.
          <Modal.Header><h5>Disclaimer</h5></Modal.Header>
        The Site has not been created for monetary gain. Any information
        on the Site should not be substituted for an advice. No liability is assumed by anyone
        for losses suffered by any person or organisation relying directly or indirectly on
        information published on the Site. Views expressed in parts of the Site,
        including Help and Tooltips are the views of the Site creator individually and do not
        necessarily offer any legal or non-legal advice whatsoever.
        Information appearing on the Site may only be reproduced with prior approval from the
        Site creator and credit given to the source. The sounds on the Site have been self
        made using Teenage Engineering PO-12 rhythm pocket operator.
          <Modal.Header><h5>Cookie policy</h5></Modal.Header>
        The required first party cookies (the cookies that are placed by the Site) are placed
        and set by the Site in order to enable you to fully use the Site and its features.
        Without these cookies logging in would not be possible.
          <Modal.Header><h5>Privacy policy</h5></Modal.Header>
        Any personal data collected through your use of the Site is done by the Site only in
        order for the Site to operate effectively and provide you the best experience with it.
        The data collected by the Site is the data that you have written in the registration form,
        the login form and everything you have written to any workout or plan, all the content in
        your Dashboard, your timer settings, your statistics and your profile settings.
        You can erase all this information that the Site has collected of you by deleting your
        account from the Delete account section in your Dashboard Profile page. This action will
        remove all of the stored data from your account from the database of this Site. The Site
        creator, though, makes no guarantee that if any of the information you have provided is
        used or not used by unauthorized persons in any way, form or means not mentioned here.
        If you wish to make sure that no one will ever see or get or misuse any of the information
        you have provided to the Site at any time, <strong>DO NOT REGISTER</strong> at all.
          <Modal.Header><h5>Availability</h5></Modal.Header>
          <strong>You need to enable JavaScript to run this app.</strong> There is and will not be
        any service to provide a forgotten password or a password to replace a forgotten one to the
        user under any circumstances. Also there will be no guarantee that the Site will always be
        available or be uninterrupted. You will also accept that during site maintenance,
          all of your data could be <strong> PERMANATELY REMOVED</strong> without notice and without
        possibility to recover any of it after maintenance is finished. The site might also be
          <strong> PERMANATELY CLOSED</strong> at any given time without notice.
          <Modal.Header><h5>Viruses, bugs and malicious use</h5></Modal.Header>
        You are responsible for configuring your information technology, hardware, software and
        platform to access the Site. You should use your own virus protection software. You must
        not misuse the Site by introducing viruses, trojans, worms, logic bombs or other material
        that is malicious or technologically hamful. You must not attempt to gain unauthorised
        access to this Site, the server on which this Site is stored or any server, computer or
        database connected to this Site. You must not attack this Site via a denial-of-service
        attack or a distributed denial-of service attack or doing anything which may affect the
        functioning of or the ability of any other person to access the Site. In any such breach
        your right to use this Site will cease immediately and such breach will be reported to the
        law enforcement authorities.
          <Modal.Header><h5>Intellectual property rights</h5></Modal.Header>
        The material and content provided on the Site is for your personal, non-commercial use only
        and you agree not for yourself or through or by way of assistance from any third party to
        distribute, copy, extract or commercially exploit such material or content. This Site as a
        whole is protected by copyright and other intellectual property rights. All rights are
        reserved.
          <Modal.Header><h5>Liability</h5></Modal.Header>
        The Site creator disclaims all liability and responsibility arising from any reliance
        placed on the content of the Site by you, or by anyone who may be informed of the
        Site&apos;s contents.
          <Modal.Header><h5>Links</h5></Modal.Header>
        The Site creator makes no representations whatsoever about any other sites that you may
        or may not access through this Site or that may link to this Site.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <br />
    </div>
  )
}

export default Footer